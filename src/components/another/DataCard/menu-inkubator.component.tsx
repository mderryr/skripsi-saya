import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVertical } from "lucide-react";

type TukikCardMenuProps = {
  data: any;
  anchorEl: null | HTMLElement;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  onReleased: (value: any) => void;
  onDead: (value: any) => void;
  onView: (value: any) => void;
};

const TukikCardMenu: React.FC<TukikCardMenuProps> = ({
  anchorEl,
  handleClick,
  handleClose,
  onDead,
  onReleased,
  onView,
  data,
}) => {
  return (
    <>
      <IconButton
        sx={{
          position: 'absolute',
          bottom: '8px',    // Sesuaikan nilai ini jika perlu
          right: '8px',     // Sesuaikan nilai ini jika perlu
          zIndex: 10,
        }}
        aria-label="more options"
        onClick={handleClick}
      >
        <MoreVertical size={20} />
      </IconButton>
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {onView && (
          <MenuItem
            onClick={() => {
              onView(data);
              handleClose();
            }}
          >
            Lihat Detail
          </MenuItem>
        )}
        {onDead && (
          <MenuItem
            onClick={() => {
              onDead(data);
              handleClose();
            }}
          >
            Tukik Mati
          </MenuItem>
        )}
        {onReleased && (
          <MenuItem
            onClick={() => {
              onReleased(data);
              handleClose();
            }}
          >
            Tukik Dilepas
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default TukikCardMenu;