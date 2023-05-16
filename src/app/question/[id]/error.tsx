// Error components must be Client Components

'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>错误</h1>
      <p>{error.message}</p>
    </div>
  );
}
