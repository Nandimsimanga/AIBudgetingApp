import { ICON_LG } from '../constants/iconProps'

export default function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon {...ICON_LG} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}
