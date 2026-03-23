interface HighlightedTextProps {
  text: string;
  highlights?: string[];
}

const HighlightedText = ({ text, highlights = [] }: HighlightedTextProps) => {
  if (highlights.length === 0) {
    return <>{text}</>;
  }

  // Create a regex pattern that matches any of the highlight phrases
  const pattern = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        const isHighlighted = highlights.some(h => h.toLowerCase() === part.toLowerCase());
        return isHighlighted ? (
          <span key={index} className="text-primary font-semibold">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </>
  );
};

export default HighlightedText;
