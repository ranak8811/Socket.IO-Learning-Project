// SystemMessage.jsx — Join/leave notifications
export default function SystemMessage({ text }) {
  return (
    <div className="flex justify-center my-2">
      <span className="text-gray-500 text-xs bg-gray-700/50 px-3 py-1 rounded-full">
        {text}
      </span>
    </div>
  );
}
