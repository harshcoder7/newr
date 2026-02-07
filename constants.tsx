import React from 'react';
import { SectionId, SectionContent } from './types';

export const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc8c66a416.mp3?filename=piano-moment-11629.mp3"; // Soft piano royalty free

export const SECTIONS: SectionContent[] = [
  {
    id: SectionId.SPECIAL,
    petalLabel: "Why You’re Special",
    title: "Anagha, You Are Rare",
    content: (
      <div className="text-center py-8">
        <p className="font-serif-heading text-2xl md:text-3xl text-rose-800 leading-relaxed italic">
          “You don’t try to be special.<br/>
          You just are.”
        </p>
      </div>
    )
  },
  {
    id: SectionId.MOMENTS,
    petalLabel: "Our Moments",
    title: "Quietly Precious",
    content: (
      <div className="text-center py-8">
        <p className="font-serif-heading text-2xl md:text-3xl text-rose-800 leading-relaxed italic">
          “You turned moments<br/>
          into memories.”
        </p>
      </div>
    )
  },
  {
    id: SectionId.FEEL,
    petalLabel: "What I Feel",
    title: "Deep & Steady",
    content: (
      <div className="text-center py-8">
        <p className="font-serif-heading text-2xl md:text-3xl text-rose-800 leading-relaxed italic">
          “What I feel for you is calm.<br/>
          And deep.<br/>
          And certain.”
        </p>
      </div>
    )
  },
  {
    id: SectionId.TODAY,
    petalLabel: "Today’s Rose",
    title: "For You, Anagha",
    content: (
      <div className="text-center py-8">
        <p className="font-serif-heading text-2xl md:text-3xl text-rose-800 leading-relaxed italic">
          “This rose is for today.<br/>
          My feelings are for always.”
        </p>
      </div>
    )
  },
  {
    id: SectionId.FOREVER,
    petalLabel: "Forever Note",
    title: "Timeless",
    content: (
      <div className="text-center py-8">
        <p className="font-serif-heading text-2xl md:text-3xl text-rose-800 leading-relaxed italic">
          “If I had to choose again,<br/>
          I’d still choose you.<br/>
          Every time.”
        </p>
      </div>
    )
  }
];