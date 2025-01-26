import { Board } from 'src/modules/board/entities/board.entity';
import { BoardUserRole } from 'src/modules/board/entities/board_user_role.entity';
import { Role } from 'src/modules/board/entities/role.entity';
import { Priority } from 'src/modules/task/entities/priority.entity';
import { Status } from 'src/modules/task/entities/status.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { generateHash } from 'src/utils/generate-hash';
import { Like, Not } from 'typeorm';
import { DataSource } from 'typeorm/data-source';

export const seed = async (datasource: DataSource) => {
  const userRepository = datasource.getRepository(User);

  const usersData = [
    {
      name: 'João Marcos',
      email: 'jmcsjoaomarcos@gmail.com',
      password: 'jmcs',
    },
    {
      name: 'Maria Silva',
      email: 'maria.silva@gmail.com',
      password: 'admin',
    },
    {
      name: 'Carlos Santos',
      email: 'carlos.santos@gmail.com',
      password: 'admin',
    },
    { name: 'Ana Costa', email: 'ana.costa@gmail.com', password: 'admin' },
    {
      name: 'Pedro Lima',
      email: 'pedro.lima@gmail.com',
      password: 'admin',
    },
    {
      name: 'Lucas Rocha',
      email: 'lucas.rocha@gmail.com',
      password: 'admin',
    },
    {
      name: 'Fernanda Oliveira',
      email: 'fernanda.oliveira@gmail.com',
      password: 'admin',
    },
    {
      name: 'Gabriel Souza',
      email: 'gabriel.souza@gmail.com',
      password: 'admin',
    },
    {
      name: 'Juliana Almeida',
      email: 'juliana.almeida@gmail.com',
      password: 'admin',
    },
    {
      name: 'Rafael Andrade',
      email: 'rafael.andrade@gmail.com',
      password: 'admin',
    },
    {
      name: 'Camila Mendes',
      email: 'camila.mendes@gmail.com',
      password: 'admin',
    },
  ];

  const users = await Promise.all(
    usersData.map(async (userData) => {
      const user = new User();
      user.name = userData.name;
      user.email = userData.email;
      user.password = await generateHash(userData.password);
      return user;
    }),
  );

  await userRepository.save(users);
  console.log('Default user insert');

  const priorityRepository = datasource.getRepository(Priority);

  const prioritiesData = [
    { description: 'Baixa' },
    { description: 'Média' },
    { description: 'Alta' },
  ];

  const priorities = prioritiesData.map((priorityData) => {
    const priority = new Priority();
    priority.description = priorityData.description;
    return priority;
  });

  await priorityRepository.save(priorities);
  console.log('Default priorities insert');

  const statusRepository = datasource.getRepository(Status);

  const statusesData = [
    { description: 'Em andamento' },
    { description: 'Finalizado' },
    { description: 'Cancelado' },
  ];

  const statuses = statusesData.map((statusData) => {
    const status = new Status();
    status.description = statusData.description;
    return status;
  });

  await statusRepository.save(statuses);
  console.log('Default status insert');

  const roleRepository = datasource.getRepository(Role);

  const rolesData = [
    { description: 'visualizador' },
    { description: 'administrador' },
  ];

  const roles = rolesData.map((roleData) => {
    const role = new Role();
    role.description = roleData.description;
    return role;
  });

  await roleRepository.save(roles);
  console.log('Default roles insert');

  const boardRepository = datasource.getRepository(Board);

  const boardsData = [
    {
      title: 'Tarefas do dia a dia',
      description: 'tarefas de rotina do dia a dia',
    },
    { title: 'Desenvolvimento', description: 'tarefas usadas no serviço' },
    {
      title: 'Faxina de casa',
      description: 'Tarefas para fazer a faxina completa da casa',
    },
  ];

  await boardRepository.save(boardsData);

  console.log('Default boards insert');

  const allUsers = await userRepository.find();

  const allBoards = await boardRepository.find();

  allBoards.forEach((board) => {
    board.members = allUsers;
  });

  await boardRepository.save(allBoards);

  const taskRepository = datasource.getRepository(Task);

  const taskBoard1 = [
    {
      title: 'Comprar mantimentos',
      description: 'Comprar alimentos e produtos de limpeza para a casa',
    },
    {
      title: 'Fazer café',
      description: 'Preparar o café da manhã para a família',
    },
    { title: 'Lavar roupas', description: 'Separar, lavar e secar as roupas' },
    {
      title: 'Pagar contas',
      description: 'Pagar as contas mensais como luz, água e internet',
    },
    { title: 'Fazer almoço', description: 'Preparar o almoço para a família' },
  ];

  const taskBoard2 = [
    {
      title: 'Revisar código',
      description: 'Revisar o código do projeto em andamento',
    },
    {
      title: 'Implementar nova funcionalidade',
      description: 'Desenvolver a funcionalidade de autenticação',
    },
    {
      title: 'Corrigir bug de layout',
      description: 'Corrigir o problema de layout no site mobile',
    },
    {
      title: 'Realizar testes unitários',
      description: 'Escrever e executar testes unitários para as APIs',
    },
    {
      title: 'Atualizar dependências',
      description:
        'Atualizar pacotes e bibliotecas do projeto para as versões mais recentes',
    },
  ];

  const taskBoard3 = [
    {
      title: 'Limpar a cozinha',
      description: 'Limpar os armários, fogão, pia e chão da cozinha',
    },
    {
      title: 'Limpar o banheiro',
      description:
        'Fazer a limpeza geral do banheiro, incluindo vaso, pia e chuveiro',
    },
    {
      title: 'Varrer a casa',
      description: 'Varrer a casa inteira, incluindo salas e corredores',
    },
    {
      title: 'Passar o aspirador',
      description: 'Passar o aspirador de pó nos quartos e sala',
    },
    {
      title: 'Trocar a roupa de cama',
      description: 'Trocar os lençóis e fronhas nos quartos',
    },
  ];

  const board1 = await boardRepository.findOne({
    where: {
      title: Like('%Tarefas do dia a dia%'),
    },
  });

  const board2 = await boardRepository.findOne({
    where: {
      title: Like('%Desenvolvimento%'),
    },
  });

  const board3 = await boardRepository.findOne({
    where: {
      title: Like('%Faxina de casa%'),
    },
  });

  const priorityDefault = priorities.find(
    (priority) => priority.description === 'Baixa',
  );

  const statusDefault = statuses.find(
    (status) => status.description === 'Não iniciado',
  );

  const createTasksForBoard = async (tasks: any[], board: Board) => {
    for (const taskData of tasks) {
      const task = new Task();
      task.title = taskData.title;
      task.description = taskData.description;
      task.board = board;
      task.priority = priorityDefault!;
      task.status = statusDefault!;
      await taskRepository.save(task);
    }
  };

  if (board1) {
    await createTasksForBoard(taskBoard1, board1);
  }
  if (board2) {
    await createTasksForBoard(taskBoard2, board2);
  }
  if (board3) {
    await createTasksForBoard(taskBoard3, board3);
  }

  console.log('Default tasks insert');

  const boardUserRoleRepository = datasource.getRepository(BoardUserRole);

  const boardsCreated = await boardRepository.find();

  const adminUser = await userRepository.findOne({
    where: { email: 'jmcsjoaomarcos@gmail.com' },
  });

  const adminRole = await roleRepository.findOne({
    where: { description: 'administrador' },
  });
  const viewerRole = await roleRepository.findOne({
    where: { description: 'visualizador' },
  });

  if (!adminUser || !adminRole || !viewerRole) {
    throw new Error('User or roles not found');
  }

  for (const board of boardsCreated) {
    const boardUserRoleAdmin = new BoardUserRole();
    boardUserRoleAdmin.userId = adminUser.id;
    boardUserRoleAdmin.boardId = board.id;
    boardUserRoleAdmin.role = adminRole;
    await boardUserRoleRepository.save(boardUserRoleAdmin);
  }

  const usersCreated = await userRepository.find({
    where: { email: Not('jmcsjoaomarcos@gmail.com') },
  });

  for (const user of usersCreated) {
    for (const board of boardsCreated) {
      const boardUserRoleViewer = new BoardUserRole();
      boardUserRoleViewer.userId = user.id;
      boardUserRoleViewer.boardId = board.id;
      boardUserRoleViewer.role = viewerRole;
      await boardUserRoleRepository.save(boardUserRoleViewer);
    }
  }

  console.log('Default boards-users-roles insert');
};
