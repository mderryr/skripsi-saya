
import moment from "moment"
import {customID, type CodeID} from "@/env/codeID"

/**
 * Generates a unique ID based on the provided parameters.
 * 
 * @param abjad The code ID to be used in the generated ID.
 * @param date The date to be included in the generated ID.
 * @returns A string representing the unique ID composed of custom code, a random number, and the formatted date.
 */

  export default function generateId(abjad: CodeID["idGet"],date:string|Date): string {
    const customCode: string = customID(abjad);
    const numberId: number = Math.floor(1000 + Math.random() * 9000); 
    const Momentdate: moment.Moment = moment(date); 
    const dateId: string = Momentdate.format('DDMMYYYY'); 
  
    return `${customCode}-${numberId}-${dateId}`;
  }
