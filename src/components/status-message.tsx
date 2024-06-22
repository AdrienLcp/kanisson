import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, type LucideIcon } from 'lucide-react'
import React from 'react'

import { DEFAULT_ICON_SIZE, classNames } from '@/helpers/styles'

import './status-message.styles.sass'

type StatusMessageType = 'error' | 'success' | 'warning'

export type StatusMessage = {
  message: string
  type: StatusMessageType
}

type StatusMessageProps = {
  className?: string
  status: StatusMessage | null
}

const statusMessageIconMap: Record<StatusMessageType, LucideIcon> = {
  error: AlertCircleIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon
}

export const StatusMessageBar: React.FC<StatusMessageProps> = ({ className, status }) => {
  if (status === null) {
    return null
  }

  const Icon = statusMessageIconMap[status.type] ?? null

  return (
    <div className={classNames('status-message', status.type, className)}>
      {Icon !== null && (
        <Icon size={DEFAULT_ICON_SIZE} />
      )}

      <p className='status-message__text'>
        {status.message}
      </p>
    </div>
  )
}
