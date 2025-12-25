const EmailVerificationModal = ({ onClose, email }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
        <h2 className="text-2xl font-bold text-[#1b4332] mb-3">
          Verify your email
        </h2>
        <p className="text-[#2d6a4f] mb-6">
          We sent a verification link to
          <br />
          <b>{email}</b>
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Please check your inbox and click the link to continue.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-900"
        >
          I've verified my email
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
