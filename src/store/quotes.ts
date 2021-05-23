

interface Quote {
    author: string,
    quote: string
}

const quotes: Quote[] = [ 
    {
        author: 'Seneca',
        quote: 'It is not that we have a short time to live, but that we waste a lot of it. Life is long enough, and a sufficiently generous amount has been given to us for the highest achievements if it were all well invested.'
    },
    {
        author: 'Seneca',
        quote: 'He who fears death will never do anything worth of a man who is alive.',
    },
    {
        author: 'Epictetus',
        quote: 'How long are you going to wait before you demand the best for yourself?',
    },
    {
        author: 'Seneca',
        quote: 'Begin at once to live, and count each separate day as a separate life.'
    },
    {
        author: 'Marcus Aurelius',
        quote: 'Stop drifting…Sprint to the finish. Write off your hopes, and if your well-being matters to you, be your own savior while you can.'
    },
    {
        author: 'Seneca',
        quote: 'Whatever can happen at any time can happen today.'
    },
    {
        author: 'Seneca',
        quote: 'They lose the day in expectation of the night, and the night in fear of the dawn.'
    },
    {
        author: 'Marcus Aurelius',
        quote: 'Let us prepare our minds as if we’d come to the very end of life. Let us postpone nothing. Let us balance life’s books each day… The one who puts the finishing touches on their life each day is never short of time.'
    },
    {
        author: 'Marcus Aurelius',
        quote: 'The happiness of your life depends upon the quality of your thoughts.'
    },
    {
        author: 'Epictetus',
        quote: 'If you want to improve, be content to be thought foolish and stupid.'
    },
    {
        author: 'Seneca',
        quote: 'Luck is what happens when preparation meets opportunity.'
    },
    {
        author: 'T.S. Eliot',
        quote: `We shall not cease from exploration\n
                And the end of all our exploring\n
                Will be to arrive where we started\n
                And know the place for the first time.`
    },
    {
        author: 'David Goggins',
        quote: 'Nobody cares what you did yesterday. What have you done today to better yourself?'
    },
    {
        author: 'David Goggins',
        quote: 'You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.'
    },
    {
        author: 'David Goggins',
        quote: 'Nobody cares what you did yesterday. What have you done today to better yourself?'
    },
    {
        author: 'Epictetus',
        quote: 'Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.'
    },
    {
        author: 'Epictetus',
        quote: 'Attach yourself to what is spiritually superior, regardless of what other people think or do. Hold to your true aspirations no matter what is going on around you.'
    },
    {
        author: 'Steven Pressfield',
        quote: 'The more scared we are of a work or calling, the more sure we can be that we have to do it.'
    },
    {
        author: 'Epictetus',
        quote: 'Don\'t hope that events will turn out the way you want, welcome events in whichever way they happen: this is the path to peace.'
    },
    {
        author: 'Friedrich Nietzsche',
        quote: 'Let us beware of saying that death is the opposite of life. The living being is only a species of the dead, and a very rare species.'
    }
];


export function getRandomQuote(): Quote {
    const nr = Math.round(Math.random() * (quotes.length - 1));
    return quotes[nr];
}