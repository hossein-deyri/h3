import ReactQuill from "react-quill-new";
import { CustomEditorStyles } from "./CustomEditorStyles";
import useCustomEditor from "./useCustomEditor";

const CustomEditor = ({ value, setFieldValue }) => {
  const { handleContent, modules, formats } = useCustomEditor({
    setFieldValue,
  });

  return (
    <CustomEditorStyles className="card">
      <ReactQuill
        theme="snow"
        formats={formats}
        modules={modules}
        value={value}
        onChange={handleContent}
      />
    </CustomEditorStyles>
  );
};

export default CustomEditor;
