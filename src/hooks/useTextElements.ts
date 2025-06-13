import {useState, useCallback} from 'react';
import {TextElement, TextElementsState} from '../types';

export const useTextElements = (): TextElementsState => {
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

  const generateId = () =>
    `text_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addText = useCallback((text: string) => {
    const newTextElement: TextElement = {
      id: generateId(),
      text: text || 'Sample Text',
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: 'bold',
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
          x: elementToCopy.x + 20,
          y: elementToCopy.y + 20,
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

  return {
    textElements,
    selectedTextId,
    addText,
    updateText,
    selectText,
    deleteText,
    copyText,
  };
};
