import { micromark } from 'micromark';
import { useState } from 'react';
import './MdRenderer.css';

export default function MdRenderer({ mdContent }: { mdContent: string }) {
  console.log(micromark('## Hello, *world*!'));
  return (
    <>
      <div
        className="counter-message"
        dangerouslySetInnerHTML={{ __html: micromark(mdContent) }}
      ></div>
    </>
  );
}
