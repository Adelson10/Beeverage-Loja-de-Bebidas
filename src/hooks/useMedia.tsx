import React from 'react';

const useMedia = (media: string) => {
    const [match, setMatch] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        function changeMatch() {
            const { matches } = window.matchMedia(media);
            setMatch(matches);
        }
        window.addEventListener('resize', changeMatch);
        return window.addEventListener('resize', changeMatch);
    },[media]);

  return match;
}

export default useMedia;