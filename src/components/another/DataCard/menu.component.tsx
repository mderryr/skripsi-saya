import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVertical } from "lucide-react";

type TukikCardMenuProps = {
  data: any;
  anchorEl: null | HTMLElement;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  onView: (item: TukikCardMenuProps["data"]) => void;
  onEdit?: (item: TukikCardMenuProps["data"]) => void;
  onDelete?: (item: TukikCardMenuProps["data"]) => void;
  onCustom?: (item: TukikCardMenuProps["data"]) => void;
  Massage?: string;
};

const TukikCardMenu: React.FC<TukikCardMenuProps> = ({
  anchorEl,
  handleClick,
  handleClose,
  onCustom,
  onDelete,
  onEdit,
  onView,
  Massage = "Ada",
  data,
}) => {
  return (
    <div className="absolute bottom-0 right-0 p-2"> {/* Wrapper div dengan positioning */}
      <IconButton
        size="small"
        aria-label="more options"
        onClick={handleClick}
        sx={{ 
          padding: '4px',
          backgroundColor: 'white', // Optional: menambahkan background putih
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)' // Optional: efek hover
          }
        }}
      >
        <MoreVertical size={16} /> {/* Ukuran icon dikecilkan */}
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
        {onCustom && (
          <MenuItem
            onClick={() => {
              onCustom(data);
              handleClose();
            }}
          >
            {Massage}
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem
            onClick={() => {
              onEdit(data);
              handleClose();
            }}
          >
            Edit
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem
            onClick={() => {
              onDelete(data);
              handleClose();
            }}
          >
            Hapus
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default TukikCardMenu;