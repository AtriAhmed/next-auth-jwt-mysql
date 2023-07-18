'use client'
import { useState, useEffect } from 'react';
import TimerItem from './TimerItem';

const CountdownTimer = () => {
    const [daysLeft, setDaysLeft] = useState('');
    const [hoursLeft, setHoursLeft] = useState('');
    const [minutesLeft, setMinutesLeft] = useState('');
    const [secondsLeft, setSecondsLeft] = useState('');

    useEffect(() => {
        const eventDate = new Date('2023-07-20'); // Replace with your event date

        const updateTimer = () => {
            const today = new Date();
            const timeDifference = eventDate - today;

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDifference / 1000) % 60);

            setDaysLeft(days)
            setHoursLeft(hours)
            setMinutesLeft(minutes)
            setSecondsLeft(seconds)

        };

        const intervalId = setInterval(updateTimer, 1000); // Update every second

        return () => {
            clearInterval(intervalId); // Clean up the interval on component unmount
        };
    }, []);

    return <div className='flex justify-center items-center flex-wrap text-5xl sm:text-7xl font- gap-4'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
        </svg>


       <TimerItem number={daysLeft} word="Day" />  : <TimerItem number={hoursLeft} word="Hour" /> : <TimerItem number={minutesLeft} word="Minute" /> : <TimerItem number={secondsLeft} word="Second" />
</div>
};

export default CountdownTimer;
