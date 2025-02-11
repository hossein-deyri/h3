const useCustomEditor = ({ setFieldValue }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "link",
    "align",
  ];

  const handleContent = (content) => {
    setFieldValue(content);
  };

  return { handleContent, modules, formats };
};

export default useCustomEditor;
