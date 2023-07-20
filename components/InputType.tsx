import Autocomplete from '@/ui/Autocomplete'
import { Input } from '@/ui/Input'
import { Switch } from '@/ui/Switch'
import { Label } from '@/ui/Label'
import { useArgValue, Args } from '@/lib/useArgs'
import { PrimitiveAtom } from 'jotai'

export default function InputType({
  argsAtom,
  arg,
  argName,
}: {
  argsAtom: PrimitiveAtom<Args<React.ElementType>>
  arg: Args<React.ElementType>[keyof Args<React.ElementType>]
  argName: keyof Args<React.ElementType>
}) {
  const { value, setValue } = useArgValue(argsAtom, argName)

  if (arg.inputType === 'autocomplete' && !arg.hideInPropsPanel) {
    return (
      <div className="space-y-2.5">
        <div className="flex flex-col gap-1.5">
          <Label>{arg.label}</Label>
          <span className="text-sm text-subtle">{arg.description}</span>
        </div>
        <Autocomplete
          value={value}
          values={arg.options}
          setValue={(value) => setValue(value)}
          className="dark:bg-foreground dark:hover:bg-subtle"
        />
      </div>
    )
  }

  if (arg.inputType === 'text' && !arg.hideInPropsPanel) {
    return (
      <div className="space-y-2.5">
        <div className="flex flex-col gap-1.5">
          <Label>
            {arg.label}
            {arg.required ? <span className="text-danger-inverted">*</span> : ''}
          </Label>
          <span className="text-sm text-subtle">{arg.description}</span>
        </div>
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          required={arg.required}
          className="dark:bg-foreground"
        />
      </div>
    )
  }

  if (arg.inputType === 'number' && !arg.hideInPropsPanel) {
    return (
      <div className="space-y-2.5">
        <div className="flex flex-col gap-1.5">
          <Label>{arg.label}</Label>
          <span className="text-sm text-subtle">{arg.description}</span>
        </div>
        <Input
          value={value}
          type="number"
          onChange={(e) => {
            setValue(e.target.value)
          }}
          className="dark:bg-foreground"
          required={arg.required}
        />
      </div>
    )
  }

  if (arg.inputType === 'switch' && !arg.hideInPropsPanel) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <Label>{arg.label}</Label>
          <span className="mr-1.5 break-words text-[13px] text-subtle">
            {arg.description}
          </span>
        </div>
        <Switch
          checked={value}
          onCheckedChange={(checked) => {
            setValue(checked)
          }}
        />
      </div>
    )
  }

  return null
}
