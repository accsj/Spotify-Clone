import React, { useState, useEffect, useCallback } from 'react';

function ProgressBar({ audioRef }) {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false); 

    const handleSeek = (e) => {
        setCurrentTime(e.target.value);
        audioRef.current.currentTime = e.target.value;
    };
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleTimeUpdate = useCallback(() => {
        if (!isDragging) {
            setCurrentTime(audioRef.current.currentTime);
        }
    }, [audioRef, isDragging]);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [audioRef, handleTimeUpdate, isDragging]);

    useEffect(() => {
        const handleDurationChange = () => {
            setDuration(audioRef.current.duration);
        };
    
        const audio = audioRef.current;
        audio.addEventListener('loadedmetadata', handleDurationChange);
        return () => {
            audio.removeEventListener('loadedmetadata', handleDurationChange);
        };
    }, [audioRef]);

    
    return (
        <div className="progress-bar">
            <span className="current-time">{formatTime(currentTime)}</span>
            <input 
                type="range" 
                className="progressbar" 
                value={currentTime} 
                max={duration} 
                onChange={handleSeek}
                onMouseDown={handleDragStart} 
                onMouseUp={handleDragEnd} 
                style={{ background: `linear-gradient(to right, #1db954 0%, #1db954 ${(currentTime / duration) * 100}%, #f4f4f4 ${(currentTime / duration) * 100}%, #f4f4f4 100%)`}}
            />
            <span className="total-time">{formatTime(duration)}</span>
        </div>
    );
}

export default ProgressBar;
