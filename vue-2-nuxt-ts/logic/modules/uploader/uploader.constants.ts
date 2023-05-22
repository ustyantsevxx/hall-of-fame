export const FILE_COLLECTIONS = [
  {
    name: 'chat_imgs',
    extensions: ['jpg', 'jpeg', 'png']
  },
  {
    name: 'chat_files',
    extensions: ['pdf', 'xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx']
  }
]

export const ACCEPTABLE_FILE_TYPES = {
  image: ['image/jpeg', 'image/jpeg', 'image/png'],
  application: [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
}

export const FILE_STATUSES = {
  CREATED: 'CREATED',
  FINISHED: 'FINISHED'
}
