import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

const EmojiPickerButtonContainer = styled.div`
  position: relative;
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: calc(100% + 4px);
  right: 0;
  z-index: 2;
  filter: ${(props) => `drop-shadow(${props.theme.primaryDark})`};

  @media (max-width: 768px) {
    right: -66px;
    .epr-main {
      width: 360px !important;
    }
  }
`;

type EmojiButtonProps = {
  onEmojiClick: (emojiData: EmojiClickData) => void;
};

const EmojiButton = ({ onEmojiClick }: EmojiButtonProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiPickerRef]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <EmojiPickerButtonContainer ref={emojiPickerRef}>
      <IconButton onClick={toggleEmojiPicker}>face</IconButton>
      {showEmojiPicker && (
        <EmojiPickerContainer>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </EmojiPickerContainer>
      )}
    </EmojiPickerButtonContainer>
  );
};

export default EmojiButton;
