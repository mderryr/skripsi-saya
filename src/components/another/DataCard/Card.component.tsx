"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import TukikCardMenu from "./menu.component";
import { getStatusColor, type Status } from "@/utils/status-card.urils";
import MenuInkubator from "./menu-inkubator.component";

interface TukikCardItem {
  id: string;
  tanggal: string;
  tanggalKemungkinan?: string;
  jumlah: string;
  status?: Status | any;
}

interface TukikCardProps {
  Track?: boolean;
  onView: (item: any) => void;
  onEdit?: (item: any) => void | undefined;
  onDelete?: (item: any) => void | undefined;
  onCustom?: (item: any) => void | undefined;
  item: TukikCardItem;
  data: any;
  Massage?: string;
  Inkubator?: boolean;
}

const TukikCard: React.FC<TukikCardProps> = ({
  onView,
  onEdit = undefined,
  onDelete = undefined,
  onCustom = undefined,
  Massage = "Ada Saja",
  data,
  item,
  Track = false,
  Inkubator = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = useCallback(() => {
    onView(data);
  }, [data, onView]);

  const renderCardContent = () => (
    <div onClick={handleView}>
      <Typography variant="h6" component="div" className="mb-2 font-bold">
        {item.id}
      </Typography>

      {item.tanggalKemungkinan && (
        <Typography color="text.secondary" className="mb-1" fontSize="0.875rem">
          Kemungkinan Menetas: <strong>{item.tanggalKemungkinan}</strong>
        </Typography>
      )}

      <Typography color="text.secondary" className="mb-1" fontSize="0.875rem">
        <strong>{item.tanggal}</strong>
      </Typography>

      <Typography variant="body2" className="font-semibold" fontSize="0.875rem">
        <strong>{item.jumlah}</strong>
      </Typography>
    </div>
  );

  const renderStatusBadge = () => (
    <div
      className={`
        absolute top-2 right-2 
        px-2 py-1 
        text-xs font-semibold 
        rounded-full 
        ${getStatusColor(item.status).color}
      `}
    >
      {getStatusColor(item.status).Status}
    </div>
  );

  const renderMenu = () =>
    Track ? (
      <TukikCardMenu
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        onView={onView}
        onCustom={onCustom}
        data={data}
        Massage={Massage}
      />
    ) :
      Inkubator && onDelete && onEdit ? (
        <MenuInkubator
          onDead={onDelete}
          onReleased={onEdit}
          onView={onView}
          data={data}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
        />
      ) : (
        <TukikCardMenu
          anchorEl={anchorEl}
          data={data}
          handleClick={handleClick}
          handleClose={handleClose}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 relative">
      {item.status && renderStatusBadge()}
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">{renderCardContent()}</div>
          <div className="ml-2">{renderMenu()}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TukikCard;
