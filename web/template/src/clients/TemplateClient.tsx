import { AuthenticationClient, RESTClient } from '@arcus-core/web-core-utilities';
import { IWidget } from '../models/IWidget';

class TemplateClient extends RESTClient {

  getAllWidgets = async ():Promise<Array<IWidget>> => {
    let widgets = [
    {
      name: 'Envio de comunicados',
      description: 'Modulo para realizar el envio de comunicados desde el portal a la aplicación',
      type: 'tool',
      url: '/news',
      permission: ['viewer'],
      disabled: false,
      order: 2,
      meta_data: {},
    },
    {
      name: 'Administración de cargos',
      description: 'Modulo para realizar el envio de comunicados desde el portal a la aplicación',
      type: 'tool',
      url: '/users-adm',
      permission: ['users.admin'],
      disabled: false,
      order: 1,
      meta_data: {},
    },
    {
      name: 'Asignar Tareas',
      description: 'Envia tareas directamente a los locales mediante la App Mi Local.',
      type: 'tool',
      url: '/task-manager',
      permission: ['viewer'],
      disabled: false,
      order: 0,
      meta_data: {},
    }]

    try {
      widgets = widgets.filter(widget => widget.permission.some(role => 
        AuthenticationClient.hasRole(role)));
      
    } catch (error) {
      console.error(error)
    }
    return widgets
  }
}

export default new TemplateClient({
  baseURL: 'http://localhost:8080'
})