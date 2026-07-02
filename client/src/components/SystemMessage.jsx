// SystemMessage.jsx — Join/leave notifications
export default function SystemMessage({ text }) {
  return (
    <div className="text-center">
      <span className="text-gray-500 text-sm bg-gray-700 px-3 py-1 rounded-full">
        {text}
      </span>
    </div>
  );
}
