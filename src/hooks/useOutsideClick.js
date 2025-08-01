import { useEffect, useRef } from "react";

function useOutsideClick(handler,listenCapturing = true) {
     const ref = useRef();
      
      useEffect(() => {
        function handleClick(e) {
          if (ref.current && !ref.current.contains(e.target)) {
          
            handler();
          }
        }
    
        document.addEventListener("click", handleClick,listenCapturing);
        return () => document.removeEventListener("click", handleClick,listenCapturing);
      }, [handler, listenCapturing])
    
    return ref;
}

export default useOutsideClick;
