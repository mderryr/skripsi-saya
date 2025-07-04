import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import React from "react"

export const TableValues = ({Head,children}:{
    Head:any,
    children:React.ReactNode,
    
  })=>{
  
    return (
      <Table>
      <TableHeader>
        <TableRow>
          {Head.map((data:any)=>
            <TableHead>{data}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
          {children}
      </TableBody>
    </Table>  
    )
  }