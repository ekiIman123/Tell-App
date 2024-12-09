import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

function LeaderboardProgress() {
  const [votes, setVotes] = useState(0); // State untuk angka vote
  const targetVotes = 40; // Target akhir angka vote

  useEffect(() => {
    // Fungsi untuk melakukan increment angka vote
    const incrementVotes = () => {
      setVotes((prevVotes) => {
        if (prevVotes < targetVotes) {
          return prevVotes + 1;
        } else {
          clearInterval(interval); // Hentikan interval jika sudah mencapai target
          return prevVotes;
        }
      });
    };

    // Set interval untuk melakukan increment setiap 50ms
    const interval = setInterval(incrementVotes, 50);

    // Cleanup function untuk membersihkan interval saat komponen unmount
    return () => clearInterval(interval);
  }, [targetVotes]);

  return (
    <div className="leaderboard-progress">
      <div className="leaderboard-bar">
        <div className="progress-bar animate__animated animate__slideInLeft"></div>
      </div>
      <div className="leaderboard-vote">
        <i>
          <IoIosArrowUp
            className={'animate__animated animate__fadeInUp animate__delay-1s'}
          />
        </i>
      </div>
      <div className="progress-desc">
        <p>{votes} vote</p>
      </div>
    </div>
  );
}

export default LeaderboardProgress;
