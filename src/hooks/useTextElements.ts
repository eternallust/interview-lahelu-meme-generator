import {useState, useCallback} from 'react';
import {TextElement, TextElementsState} from '../types';
import {COLORS, DIMENSIONS, STRINGS} from '../constants';

export const useTextElements = (): TextElementsState & {
  editingTextElement: TextElement | null;
  setEditingTextElement: (element: TextElement | null) => void;
} => {
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [editingTextElement, setEditingTextElement] =
    useState<TextElement | null>(null);

  const generateId = () =>
    `text_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addText = useCallback((text: string) => {
    const newTextElement: TextElement = {
      id: generateId(),
      text: text || STRINGS.SAMPLE_TEXT,
      x: DIMENSIONS.DEFAULT_POSITION,
      y: DIMENSIONS.DEFAULT_POSITION,
      rotation: DIMENSIONS.DEFAULT_POSITION,
      scale: DIMENSIONS.DEFAULT_SCALE,
      fontSize: DIMENSIONS.TEXT_DEFAULT_FONT_SIZE,
      color: COLORS.TEXT_DEFAULT,
      backgroundColor: COLORS.TRANSPARENT,
      fontWeight: STRINGS.FONT_WEIGHTS.BOLD,
      isSelected: true,
    };

    setTextElements(prev => {
      const updatedElements = prev.map(el => ({...el, isSelected: false}));
      return [...updatedElements, newTextElement];
    });

    setSelectedTextId(newTextElement.id);
  }, []);

  const updateText = useCallback(
    (id: string, updates: Partial<TextElement>) => {
      setTextElements(prev =>
        prev.map(element =>
          element.id === id ? {...element, ...updates} : element,
        ),
      );
    },
    [],
  );

  const selectText = useCallback((id: string | null) => {
    setSelectedTextId(id);
    setTextElements(prev =>
      prev.map(element => ({
        ...element,
        isSelected: element.id === id,
      })),
    );
  }, []);

  const deleteText = useCallback((id: string) => {
    setTextElements(prev => prev.filter(element => element.id !== id));
    setSelectedTextId(prev => (prev === id ? null : prev));
  }, []);

  const copyText = useCallback(
    (id: string) => {
      const elementToCopy = textElements.find(el => el.id === id);
      if (elementToCopy) {
        const copiedElement: TextElement = {
          ...elementToCopy,
          id: generateId(),
          x: elementToCopy.x + DIMENSIONS.TEXT_COPY_OFFSET,
          y: elementToCopy.y + DIMENSIONS.TEXT_COPY_OFFSET,
          isSelected: true,
        };

        setTextElements(prev => {
          const updatedElements = prev.map(el => ({...el, isSelected: false}));
          return [...updatedElements, copiedElement];
        });

        setSelectedTextId(copiedElement.id);
      }
    },
    [textElements],
  );

  const editText = useCallback(
    (id: string) => {
      const elementToEdit = textElements.find(el => el.id === id);
      if (elementToEdit) {
        setEditingTextElement(elementToEdit);
      }
    },
    [textElements],
  );

  return {
    textElements,
    selectedTextId,
    editingTextElement,
    setEditingTextElement,
    addText,
    updateText,
    selectText,
    deleteText,
    copyText,
    editText,
  };
};
