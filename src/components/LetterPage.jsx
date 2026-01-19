import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LetterPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="letter-container" style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)' }}>

            {/* Background Stars */}
            {[...Array(50)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        width: Math.random() * 3 + 'px',
                        height: Math.random() * 3 + 'px',
                        background: 'white',
                        borderRadius: '50%',
                        opacity: Math.random(),
                        animation: `twinkle ${Math.random() * 5 + 2}s infinite`
                    }}
                />
            ))}
            <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

            {/* Card Container */}
            <div
                style={{ perspective: '1000px', cursor: 'pointer', zIndex: 10 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <motion.div
                    animate={{ rotateY: isOpen ? 180 : 0 }}
                    transition={{ duration: 1, type: "spring", stiffness: 50 }}
                    style={{
                        width: '350px',
                        height: '550px', // Made slightly taller for photo
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Front of Card */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        border: '5px solid white'
                    }}>
                        <div style={{ fontSize: '80px' }}>💌</div>
                        <h2 style={{ color: 'white', marginTop: '20px', fontFamily: 'Pacifico' }}>For You 💖</h2>
                        <p style={{ color: 'white', marginTop: '10px' }}>Tap to Reveal</p>
                    </div>

                    {/* Back of Card (Message) */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'linear-gradient(to bottom right, #fff0f5, #fff)', // Lavender blush to white
                        borderRadius: '20px',
                        padding: '20px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        overflowY: 'auto',
                        border: '4px solid #ffc1e3' // Pink soft border
                    }}>
                        {/* Photo Placeholder */}
                        <div style={{
                            width: '100%',
                            height: '240px',
                            background: '#fff',
                            borderRadius: '15px',
                            marginBottom: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            border: '3px dashed #ff9a9e', // Cute dashed border
                            padding: '5px'
                        }}>
                            {/* Replace src with actual photo */}
                            <img
                                src="/inchara_final.png"
                                alt="Birthday Girl"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                            />
                        </div>

                        <h3 style={{ color: '#d81b60', marginBottom: '10px', fontFamily: 'Pacifico', fontSize: '1.8rem' }}>Happy 18th! 🌸</h3>
                        <p style={{ color: '#555', lineHeight: '1.6', fontFamily: 'Outfit', fontSize: '0.9rem', flex: 1 }}>
                            <b>Dearest Inchara,</b>
                            <br />
                            Welcome to adulthood! ✨
                            <br />
                            You have a smile that lights up the world and a heart of pure gold.
                            May this special year bring you endless joy, dreamy adventures, and all the love you truly deserve.
                            <br />
                            Keep shining, beautiful!
                        </p>
                        <div style={{ marginTop: '5px', color: '#ff4081', fontSize: '1.5rem' }}>💖🌺💫</div>
                    </div>
                </motion.div>
            </div>

            <div style={{ position: 'absolute', bottom: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                Made with love & code 💻💗
            </div>

        </div>
    );
}
