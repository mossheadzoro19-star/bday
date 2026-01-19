import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

// Simple beep sound synthesizer for balloon pop
const playPopSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
};

export default function CelebrationPage({ onNext }) {
    const [candlesBlown, setCandlesBlown] = useState(false);
    const [showBalloons, setShowBalloons] = useState(false);
    const [micError, setMicError] = useState(false);

    // Initialize Balloons State immediately (Synchronous)
    // Initialize Balloons State immediately (Synchronous)
    const [balloons, setBalloons] = useState(() => {
        const messages = ["You", "Are", "A", "Cutie", "💖"];
        return messages.map((msg, i) => ({
            id: i,
            color: ['#ff9a9e', '#fad0c4', '#a18cd1', '#84fab0', '#fbc2eb'][i % 5],
            message: msg,
            popped: false
        }));
    });

    const [poppedCount, setPoppedCount] = useState(0);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const microphoneRef = useRef(null);
    const blownRef = useRef(false);

    // Audio Detection Logic
    useEffect(() => {
        let animationFrame;

        const startListening = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                analyserRef.current = audioContextRef.current.createAnalyser();
                microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
                microphoneRef.current.connect(analyserRef.current);
                analyserRef.current.fftSize = 256;

                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const checkAudioLevel = () => {
                    if (!blownRef.current) {
                        analyserRef.current.getByteFrequencyData(dataArray);
                        const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

                        // Threshold for "blowing"
                        if (average > 100) {
                            blowCandles();
                        }
                        animationFrame = requestAnimationFrame(checkAudioLevel);
                    }
                };
                checkAudioLevel();
            } catch (err) {
                console.error("Microphone access denied", err);
                setMicError(true);
            }
        };

        if (!candlesBlown) {
            startListening();
        }

        return () => {
            cancelAnimationFrame(animationFrame);
            if (microphoneRef.current) microphoneRef.current.disconnect();
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, [candlesBlown]);

    const blowCandles = () => {
        if (blownRef.current) return;
        blownRef.current = true;
        setCandlesBlown(true);
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff9a9e', '#fad0c4', '#a18cd1']
        });
        setTimeout(() => setShowBalloons(true), 1500);
    };

    const handlePop = (id) => {
        playPopSound();
        setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
        setPoppedCount(prev => prev + 1);
    };

    // Check if all balloons popped
    useEffect(() => {
        if (showBalloons && poppedCount === balloons.length && balloons.length > 0) {
            setTimeout(onNext, 3000); // Auto proceed after 3s
        }
    }, [poppedCount, balloons, onNext, showBalloons]);

    return (
        <div className="celebration-container" style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

            {/* Header */}
            <motion.h1
                animate={{ y: 0, opacity: showBalloons ? 0 : 1 }}
                initial={{ y: -50, opacity: 0 }}
                className="title"
                style={{ fontFamily: 'Pacifico, cursive', fontSize: '2.5rem', color: '#fff', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', marginBottom: '40px', zIndex: 10 }}
            >
                Happiest 18th Birthday,<br />Inchara 💖
            </motion.h1>

            {/* Cake Stage */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, opacity: showBalloons ? 0 : 1 }}
                className="cake-stage"
                style={{ position: 'relative', textAlign: 'center' }}
            >
                <div className="cake" style={{ fontSize: '100px', cursor: 'pointer', position: 'relative', display: 'inline-block' }} onClick={blowCandles}>
                    <span style={{ filter: candlesBlown ? 'grayscale(0.5)' : 'none', transition: 'filter 1s' }}>🎂</span>
                </div>
                <p style={{ color: 'white', marginTop: '20px', fontSize: '1.2rem', opacity: 0.9 }}>
                    {micError ? "Tap the cake to blow the candles!" : "Make a wish and blow the candles 🕯️"}
                </p>
            </motion.div>

            {/* Balloon Game */}
            {showBalloons && (
                <div
                    className="balloon-game"
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '10px', fontFamily: 'Pacifico' }}>Pop the balloons! 💕</h2>
                    <p style={{ color: 'white', opacity: 0.8, marginBottom: '30px', fontFamily: 'Outfit' }}>
                        (Pop them one by one, from Left to Right 🎈)
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', width: '100%', maxWidth: '800px', padding: '0 20px' }}>
                        {balloons.map((balloon) => (
                            !balloon.popped ? (
                                <motion.div
                                    key={balloon.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: balloon.id * 0.2 }}
                                    onClick={(e) => { e.stopPropagation(); handlePop(balloon.id); }}
                                    style={{
                                        fontSize: '80px',
                                        color: balloon.color,
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                        position: 'relative', // Static position in flex
                                        margin: '10px'
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    🎈
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`msg-${balloon.id}`}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'white',
                                        borderRadius: '50%',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                        margin: '10px'
                                    }}
                                >
                                    <p style={{ color: balloon.color, fontWeight: 'bold', fontSize: '1.2rem' }}>{balloon.message}</p>
                                </motion.div>
                            )
                        ))}
                    </div>

                    {poppedCount >= 1 && poppedCount < balloons.length && (
                        <div style={{ marginTop: '40px', textAlign: 'center', color: 'white', fontSize: '1.2rem', fontFamily: 'Pacifico' }}>
                            Keep popping...
                        </div>
                    )}
                    {poppedCount === balloons.length && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="btn-primary"
                            style={{ marginTop: '40px' }}
                            onClick={onNext}
                        >
                            Go to Surprise 💝
                        </motion.button>
                    )}
                </div>
            )}
        </div>
    );
}
