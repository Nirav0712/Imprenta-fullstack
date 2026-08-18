import { useRef, useState } from "react";
import {
  FiUploadCloud,
  FiFile,
  FiTrash2,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

const UploadArtwork = ({ next, back, formData, updateFormData }) => {

  const inputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const arr = Array.from(selectedFiles);
    // Just keep the first file for simplicity in demo
    if (arr.length > 0) {
      updateFormData({ artwork: arr[0] });
    }
  };

  return (

    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h2 className="text-4xl font-black text-white">

          Upload Artwork

        </h2>

        <p className="mt-3 text-slate-400 max-w-2xl">

          Upload your artwork or logo. Supported formats include AI, PDF,
          PSD, PNG and JPG.

        </p>

      </div>

      {/* Upload Box */}

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {

          e.preventDefault();

          handleFiles(e.dataTransfer.files);

        }}
        className="
          cursor-pointer
          rounded-[32px]
          border-2
          border-dashed
          border-sky-400/30
          bg-white/5
          p-12
          text-center
          transition
          hover:border-sky-400
          hover:bg-white/10
        "
      >

        <FiUploadCloud
          size={60}
          className="mx-auto text-sky-400"
        />

        <h3 className="mt-6 text-2xl font-bold text-white">

          Drag & Drop Files

        </h3>

        <p className="mt-3 text-slate-400">

          or click to browse your computer

        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={(e) =>
            handleFiles(e.target.files)
          }
        />

      </div>

      {/* Files */}

      {formData.artwork && (

        <div className="space-y-4">

          <div
            className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
              "
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">

                <FiFile className="text-sky-400" />

              </div>

              <div>

                <p className="font-semibold text-white">

                  {formData.artwork.name}

                </p>

                <p className="text-sm text-slate-400">

                  {(formData.artwork.size / 1024 / 1024).toFixed(2)} MB

                </p>

              </div>

            </div>

            <button
              onClick={() =>
                updateFormData({ artwork: null })
              }
              className="
                  rounded-xl
                  bg-red-500/10
                  p-3
                  text-red-400
                  transition
                  hover:bg-red-500
                  hover:text-white
                "
            >

              <FiTrash2 />

            </button>

          </div>

        </div>

      )}

      {/* Bottom */}

      <div className="flex justify-between">

        <button
          onClick={back}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-8
            py-4
            text-white
            transition
            hover:border-sky-400
          "
        >

          <FiArrowLeft />

          Back

        </button>

        <button
          onClick={next}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-sky-500
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:bg-sky-600
          "
        >

          Continue

          <FiArrowRight />

        </button>

      </div>

    </div>

  );

};

export default UploadArtwork;