import React, { useRef, useState } from 'react';
import { Dimensions, LayoutRectangle, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'right' | 'left';
}

const TOOLTIP_WIDTH = 180;
const TOOLTIP_HEIGHT = 48;
const MARGIN = 8;

const Tooltip: React.FC<TooltipProps> = ({ content, children, direction = 'top' }) => {
  const [visible, setVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const triggerRef = useRef<View>(null);

  const showTooltip = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
        setVisible(true);
      });
    }
  };

  const hideTooltip = () => setVisible(false);

  // Calculate tooltip position and clamp to screen
  const getTooltipStyle = () => {
    if (!triggerLayout) return { top: 0, left: 0 };
    const { x, y, width, height } = triggerLayout;
    const screen = Dimensions.get('window');
    let left = 0, top = 0;
    switch (direction) {
      case 'top':
        left = x + width / 2 - TOOLTIP_WIDTH / 2;
        top = y - TOOLTIP_HEIGHT - MARGIN;
        break;
      case 'bottom':
        left = x + width / 2 - TOOLTIP_WIDTH / 2;
        top = y + height + MARGIN;
        break;
      case 'right':
        left = x + width + MARGIN;
        top = y + height / 2 - TOOLTIP_HEIGHT / 2;
        break;
      case 'left':
        left = x - TOOLTIP_WIDTH - MARGIN;
        top = y + height / 2 - TOOLTIP_HEIGHT / 2;
        break;
      default:
        break;
    }
    // Clamp horizontally
    left = Math.max(MARGIN, Math.min(left, screen.width - TOOLTIP_WIDTH - MARGIN));
    // Clamp vertically
    top = Math.max(MARGIN, Math.min(top, screen.height - TOOLTIP_HEIGHT - MARGIN));
    return {
      position: 'absolute' as const,
      left,
      top,
      width: TOOLTIP_WIDTH,
      minWidth: 80,
      maxWidth: 220,
      zIndex: 100,
    };
  };

  return (
    <>
      <TouchableOpacity
        ref={triggerRef}
        onPress={showTooltip}
        activeOpacity={0.7}
        style={styles.trigger}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {children}
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={hideTooltip}>
        <Pressable style={styles.overlay} onPress={hideTooltip}>
          {triggerLayout && (
            <View style={[styles.tooltipBox, getTooltipStyle()]}
              pointerEvents="box-none"
            >
              <Text style={styles.tooltipText}>{content}</Text>
            </View>
          )}
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
  },
  tooltipBox: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 100,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'right',
    writingDirection: 'rtl',
    flexShrink: 1,
    width: '100%',
    lineHeight: 22,
  },
});

export default Tooltip; 