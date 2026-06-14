import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-7xl font-bold text-primary-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
