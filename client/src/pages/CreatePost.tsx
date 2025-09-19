const CreatePost = () => {
  return (
    <div>
      <h1>Create Post Page</h1>
      <p>This is where the Create Post form will go.</p>
      <form>
        <div>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' required />
        </div>
        <div>
          <label htmlFor='content'>Content</label>
          <textarea id='content' name='content' required></textarea>
        </div>
        <button type='submit'>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
