import React from "react";

const Spinner = () => (
  <div className="flex justify-center items-center my-8">
    <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 animate-spin"></div>
  </div>
);
type Props = {};

const LoadingSection = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-[80vh] note-container">
      <Spinner />
    </div>
  );
};

export default LoadingSection;
