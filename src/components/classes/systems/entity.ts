interface Entity {
    type: EntityType
  }
  
  enum EntityType {
    enemy,
    link,
    tile,
    entrance
  }