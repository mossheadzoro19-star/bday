import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function LoginPage({ onLogin }) {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Replace these with the actual birthday person's details!
        // For demo purposes: Name = "Cutiepie", DOB = "2008-01-19" (Assuming 18th in 2026 implies 2008 born?)
        // Request asks for "Happiest 18th Birthday", current date in metadata is Jan 2026.
        // So 2026 - 18 = 2008.
        const CORRECT_NAME = "Inchara";
        const CORRECT_DOB = "2008-01-19";

        if (name.trim().toLowerCase() === CORRECT_NAME.toLowerCase() && dob === CORRECT_DOB) {
            onLogin();
        } else {
            setError("Oops! Are you sure you're the birthday girl? 🌸");
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="login-container" style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Background Hearts Animation */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }}
                    animate={{ y: "-10vh", opacity: [0, 1, 0] }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
                    style={{ position: 'absolute', color: 'rgba(255, 255, 255, 0.6)', fontSize: Math.random() * 20 + 10 + 'px', left: 0 }}
                >
                    <Heart fill="currentColor" />
                </motion.div>
            ))}

            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="glass-card"
                style={{ zIndex: 10 }}
            >
                <h1 style={{ marginBottom: '1rem', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Welcome! 💫</h1>
                <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.9)' }}>Enter your details to unlock the surprise</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Your lovely name"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="date"
                        className="input-field"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />

                    <div style={{ minHeight: '24px' }}>
                        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ff4d4d', fontSize: '0.9rem', fontWeight: 'bold' }}>{error}</motion.p>}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="btn-primary"
                        style={{ marginTop: '10px' }}
                    >
                        Enter the Magic 💫
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
