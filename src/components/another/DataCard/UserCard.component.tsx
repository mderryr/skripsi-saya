'use client'

import { useState } from "react";
import { CardContent, Typography, Avatar, Box } from '@mui/material';
import { User, AtSign, Phone } from 'lucide-react';
import { StyledCard, UserInfoRow, StyledIcon } from '@/styles/style-card-user'
import MenuAll from "./menu.component";

interface UserCardProps {
    nama: string;
    userName: string;
    noTelephone: string;
    data: any;
    onView: (item: any) => void;
    onEdit?: (item: any) => void | undefined;
    onDelete?: (item: any) => void | undefined;
    onCustom?: (item: any) => void | undefined;
}
export default function UserCard({ nama, userName, noTelephone, data, onView, onEdit, onDelete }: UserCardProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <StyledCard>
            <CardContent sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3
            }}>
                {/* Avatar */}
                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'primary.main',
                        fontSize: '2rem',
                    }}
                >
                    {nama.charAt(0).toUpperCase()}
                </Avatar>

                {/* User Info */}
                <Box sx={{ flex: 1 }}>
                    <UserInfoRow>
                        <StyledIcon><User size={20} /></StyledIcon>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                fontSize: '1rem',
                                color: 'text.primary'
                            }}
                        >
                            {nama}
                        </Typography>
                    </UserInfoRow>

                    <UserInfoRow>
                        <StyledIcon><AtSign size={20} /></StyledIcon>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                color: 'text.secondary'
                            }}
                        >
                            @{userName}
                        </Typography>
                    </UserInfoRow>

                    <UserInfoRow>
                        <StyledIcon><Phone size={20} /></StyledIcon>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                color: 'text.secondary'
                            }}
                        >
                            {noTelephone}
                        </Typography>
                    </UserInfoRow>
                </Box>
                <MenuAll
                    anchorEl={anchorEl}
                    data={data}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </CardContent>
        </StyledCard>
    );
}
