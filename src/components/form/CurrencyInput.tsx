import { ComponentProps, useState } from "react";
import { Input } from "../ui/input";

export type CurrencyInputProps = ComponentProps<typeof Input> & {
  value: number;
  onChange: (value: number) => void;
};

function MoneyMask(value: string): string {
  if(value.length === 0) return ''
  const onlyNumbers = value.replace(/\D/g, '')
  
  const inputValue = onlyNumbers.length === 0 ? 0 : parseInt(onlyNumbers);
  const formatedValue = (inputValue / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });
  
  if (formatedValue === '0,00') return ''
  return formatedValue
}
function unmask(value:string): number{
  const onlyNumbers = value.replace(/\D/g, '')
  
  return onlyNumbers.length ===0 ? 0 : Number(onlyNumbers)
}
/**
 * WARNING: This input returns the value in CENTS
 */
export function CurrencyInput({ onChange, ...rest }: CurrencyInputProps) {
  const [maskedValue, setMaskedValue] = useState('');


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const numberValue = unmask(value)
    
    onChange(numberValue)
    setMaskedValue(MoneyMask(value))
  }

  return <Input {...rest} value={MoneyMask(maskedValue)} onChange={handleChange} />;
}
