"use client";

import { useRef, useState, useLayoutEffect } from "react";

/**
 * ReadMore コンポーネント
 * @param children 表示テキスト
 */
export default function ReadMore({ children }: { children: React.ReactNode }) {
  const textDivRef = useRef<HTMLDivElement>(null);
  const [showFull, setShowFull] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const toggleShowFull = () => {
    setShowFull(!showFull);
  };
  const isTextOverflow = (el: HTMLDivElement) => {
    if (el.scrollHeight > el.clientHeight) {
      setIsOverflow(true);
    }
  };

  useLayoutEffect(() => {
    isTextOverflow(textDivRef.current!);
  }, []);

  return (
    <>
      <div className={showFull ? "" : "line-clamp-3"} ref={textDivRef}>
        {children}
      </div>
      {isOverflow && (
        <div className="text-right">
          <span
            className="text-blue-700 cursor-pointer"
            onClick={toggleShowFull}
          >
            {showFull ? "閉じる" : "続きを読む"}
          </span>
        </div>
      )}
    </>
  );
}
