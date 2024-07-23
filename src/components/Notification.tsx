import React, { useEffect } from "react";
import styled from "styled-components";

// type
interface NotificationProps {
  message: string;
  onClose: () => void;
}

// css
const NotificationContainer = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  opacity: 0.9;
`;

// 알림 시간 설정.
const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // 2초후 사라짐.
    return () => clearTimeout(timer); // 컴포넌트가 언마운트 될때 타이머 정리딤.
  }, [onClose]);

  return <NotificationContainer>{message}</NotificationContainer>;
};

export default Notification;
