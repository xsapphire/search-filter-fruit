import { ReactElement, ReactNode, RefObject } from "react";
import styled, { keyframes } from "styled-components";
import { themedColors } from "../colors";

const growDown = keyframes`
  0% {
    transform: scaleY(0);
  }
  80% {
    transform: scaleY(1.1);
  },
  100% {
    transform: scaleY(1);
  }
})`;

const DropdownMenuWrapper = styled.div`
  border: 1px solid ${themedColors.icon.input};
  z-index: 1;
  animation: ${growDown} 300ms ease-in-out forwards;
  transform-origin: top center;
`;

export const DropdownMenu = ({
  divRef,
  children,
}: {
  divRef?: RefObject<HTMLDivElement>;
  children: ReactNode;
}): ReactElement => {
  return (
    <DropdownMenuWrapper
      ref={divRef}
      className="w-full absolute bg-white py-1 mt-1"
    >
      {children}
    </DropdownMenuWrapper>
  );
};
