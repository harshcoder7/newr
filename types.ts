import React from 'react';

export enum SectionId {
  SPECIAL = 'special',
  MOMENTS = 'moments',
  FEEL = 'feel',
  TODAY = 'today',
  FOREVER = 'forever'
}

export interface SectionContent {
  id: SectionId;
  title: string;
  petalLabel: string;
  content: React.ReactNode;
}