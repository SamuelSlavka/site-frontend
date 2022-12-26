import { BackgroundColors } from "../enums/background-colors.enum";
import { Icons } from "../enums/icons.enum";

export const navItems = [
    {
        id: '1',
        name: 'Flappy bird',
        route: 'http://game.sam-sla.net',
        bg: BackgroundColors.BLUE,
        icon: Icons.GAMEPAD,
    },
    {
        id: '2',
        name: 'Jellyfin',
        route: 'http://jelly.sam-sla.net',
        icon: Icons.JAR,
    },
    {
        id: '3',
        name: 'Audiobookshelf',
        route: 'http://shelf.sam-sla.net',
        icon: Icons.BOOK,
    },
    {
        id: '4',
        name: 'NextCloud',
        route: 'http://next.sam-sla.net',
        icon: Icons.CLOUD,
    },
    {
        id: '5',
        name: 'Grafana',
        route: 'http://graph.sam-sla.net',
        icon: Icons.CHART,
    },
    {
        id: '6',
        name: 'Lunch',
        link: '/lunch',
        icon: Icons.BOWL,
    },
];
