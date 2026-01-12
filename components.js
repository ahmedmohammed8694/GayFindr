// Grindr-style UI Components with Tailwind design tokens

// ProfileCard Component
export const ProfileCard = ({ profile, onPress }) => (
  <div 
    className="bg-bg-surface rounded-md overflow-hidden relative aspect-square cursor-pointer hover:scale-105 transition-transform animate-fadeIn"
    onClick={onPress}
  >
    <div className="w-full h-3/4 bg-gradient-to-br from-gray-600 to-gray-800 relative">
      {profile.isOnline && (
        <div className="w-3 h-3 bg-status-online rounded-full absolute top-2 right-2 border-2 border-bg-primary animate-pulseSoft" />
      )}
      <DistanceBadge distance={profile.distance} />
    </div>
    <div className="p-2 flex justify-between items-center">
      <span className="font-semibold text-text-primary truncate">{profile.displayName}</span>
      <span className="text-text-secondary text-xs">{profile.age}</span>
    </div>
  </div>
);

// DistanceBadge Component
export const DistanceBadge = ({ distance }) => {
  const formatDistance = (d) => {
    if (d < 100) return 'Nearby';
    if (d < 1000) return `~${Math.round(d / 100) * 100}m`;
    if (d < 5000) return `~${Math.round(d / 1000)}km`;
    return '5km+';
  };

  return (
    <div className="absolute bottom-2 left-2 bg-overlay px-2 py-1 rounded-full text-xs font-semibold text-text-primary">
      {formatDistance(distance)}
    </div>
  );
};

// ChatBubble Component
export const ChatBubble = ({ message, isMe, showTimestamp }) => (
  <div className="mb-1 animate-slideUp">
    {showTimestamp && (
      <div className="text-center text-text-tertiary text-xs my-2">
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    )}
    <div className={`max-w-xs px-4 py-2 rounded-xl ${
      isMe 
        ? 'bg-chat-sent text-chat-sentText ml-auto rounded-br-xs' 
        : 'bg-chat-received text-chat-receivedText mr-auto rounded-bl-xs'
    }`}>
      {message.content}
    </div>
  </div>
);

// OnlineDot Component
export const OnlineDot = ({ isOnline, size = 'sm' }) => {
  const sizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  };

  return isOnline ? (
    <div className={`${sizeClasses[size]} bg-status-online rounded-full border-2 border-bg-primary animate-pulseSoft`} />
  ) : null;
};

// ActionButton Component
export const ActionButton = ({ icon, label, variant = 'default', onClick, disabled }) => {
  const variants = {
    default: 'bg-bg-surface text-text-primary border-border',
    primary: 'bg-brand text-text-inverse hover:bg-brand-hover',
    danger: 'bg-status-error text-text-primary hover:bg-red-600'
  };

  return (
    <button 
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${variants[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-glow active:scale-95'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

// FilterSlider Component
export const FilterSlider = ({ value, min, max, onChange, label }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <span className="text-text-primary font-medium">{label}</span>
      <span className="text-brand text-sm">{value}</span>
    </div>
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer slider"
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFD400;
          border: 2px solid #000;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFD400;
          border: 2px solid #000;
          cursor: pointer;
        }
      `}</style>
    </div>
  </div>
);

// Usage Examples:
/*
<ProfileCard 
  profile={{ displayName: 'Alex', age: 25, distance: 150, isOnline: true }}
  onPress={() => console.log('Profile clicked')}
/>

<ChatBubble 
  message={{ content: 'Hey there!', createdAt: new Date() }}
  isMe={false}
  showTimestamp={true}
/>

<ActionButton 
  icon="💬"
  label="Message"
  variant="primary"
  onClick={() => console.log('Message clicked')}
/>
*/