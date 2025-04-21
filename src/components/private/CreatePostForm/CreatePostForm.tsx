import { useState } from 'react';

const CreatePostForm = () => {
  const [text, setText] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      console.log('Nueva publicación:', text);
      setText('');
    }
  };

  return (
    <form onSubmit={handlePost}>
      <textarea
        rows={3}
        placeholder="¿Qué está pasando?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Publicar</button>
    </form>
  );
};

export default CreatePostForm;
