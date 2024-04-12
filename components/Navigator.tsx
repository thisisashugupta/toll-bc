import LinkTab from '@/components/ui/link-tab'

function Navigator() {
  return (
    <div className="flex">
        <LinkTab href="/toll-manager">Manage Toll</LinkTab>
        <LinkTab href="/pay">Pay Toll</LinkTab>
    </div>
  )
}

export default Navigator