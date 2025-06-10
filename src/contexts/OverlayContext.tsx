import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";

type OverlayContextType = {
  overlayChildren: ReactNode;
  setOverlayChildren: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  loadingOverlay: boolean;
};
const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [overlayChildren, setOverlayChildren] = useState<React.ReactNode>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loadingOverlay, setLoadingOverlay] = useState<boolean>(false);

  const value: OverlayContextType = {
    overlayChildren,
    setOverlayChildren,
    open,
    setOpen,
    loadingOverlay,
    setLoadingOverlay,
  };

  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
};

export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider.");
  }
  return context;
};
