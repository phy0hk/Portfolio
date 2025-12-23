export interface DisplayDataType {
  id?: number;
  display_type: string;
  display_content: string;
}
export interface HistoryDataType {
  id: number;
  command: string;
  timestamp: Date;
}
export interface UserInputType {
  id: number;
  input: string;
}
