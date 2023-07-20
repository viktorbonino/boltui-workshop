import * as Table from '@/ui/Table'
import { Args } from '@/lib/useArgs'
import { Slot } from '@/lib/useArgsWithSlots'
import Text from '@/ui/Text'

export default function PropsTable({
  args,
  title,
}: {
  args: Args<React.ElementType>
  title: string
}) {
  return (
    <>
      <div className="mt-12">
        <div className="pb-6">
          <Text
            href={`#${title.toLowerCase().replaceAll(' ', '-')}`}
            id={title.toLowerCase().replaceAll(' ', '-')}
            as="h2"
            variant="h4"
            asJumpLink
          >
            {title}
          </Text>
        </div>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>PROP</Table.Head>
              <Table.Head>TYPE</Table.Head>
              <Table.Head>DESCRIPTION</Table.Head>
              <Table.Head>DEFAULT</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {args
              ? Object.keys(args).map((key) => (
                  <Table.Row key={key}>
                    <Table.Cell>
                      {key}
                      {args[key].required ? (
                        <span className="text-danger-inverted">*</span>
                      ) : (
                        ''
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span className="rounded-default border border-emphasis bg-accent p-1 px-2 text-xs shadow-default selection:bg-subtle">
                        {args[key].type}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{args[key].description}</Table.Cell>
                    <Table.Cell>
                      {args[key].defaultValue ? (
                        <span className="rounded-default border border-emphasis bg-accent p-1 px-2 text-xs shadow-default selection:bg-subtle">
                          {args[key].defaultValue}
                        </span>
                      ) : (
                        '-'
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))
              : null}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  )
}

export function SlotsPropsTable({
  slots,
}: {
  slots: Record<string, Slot<React.ElementType>>
}) {
  return (
    <>
      {Object.keys(slots).map((slot) => {
        return (
          <PropsTable
            key={slot}
            args={slots[slot].args}
            title={`${slot.charAt(0).toUpperCase() + slot.slice(1)} Props`}
          />
        )
      })}
    </>
  )
}
