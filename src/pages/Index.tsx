import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const tournamentDate = new Date('2025-12-15T10:00:00').getTime();
      const now = new Date().getTime();
      const difference = tournamentDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 game-gradient rounded-lg flex items-center justify-center">
              <Icon name="Trophy" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold">CR Tournament</span>
          </div>
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">О турнире</button>
            <button onClick={() => scrollToSection('prizes')} className="hover:text-primary transition-colors">Призы</button>
            <button onClick={() => scrollToSection('schedule')} className="hover:text-primary transition-colors">Расписание</button>
            <button onClick={() => scrollToSection('rules')} className="hover:text-primary transition-colors">Правила</button>
            <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
          </div>
          <Button className="game-gradient hover:brightness-125 transition-all duration-300" onClick={() => window.open('https://t.me/crtournament_rostov', '_blank')}>Регистрация</Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://cdn.poehali.dev/projects/94cc7da1-e015-4c01-9bcd-c9f0550c3e4a/files/f3ee0f20-3af2-44f3-a409-80e87d3175b6.jpg" alt="Clash Royale Battle" className="w-full h-full object-cover" />
          <div className="absolute inset-0 game-gradient opacity-50"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                boxShadow: `0 0 ${Math.random() * 20 + 10}px hsl(262, 90%, 65%)`
              }}
            />
          ))}
        </div>
        <div className="container mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6">
            <Icon name="Zap" size={20} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Грандиозное событие</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent glow-text">
            Clash Royale Tournament
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">Ростов-на-Дону</p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={24} className="text-secondary" />
              <span className="text-2xl font-bold">15 декабря 2025</span>
            </div>
          </div>
          
          <div className="mb-8 max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground mb-3">До начала турнира осталось:</p>
            <div className="grid grid-cols-4 gap-3 md:gap-6">
              <div className="bg-card/80 backdrop-blur-sm neon-border rounded-lg p-4 animate-pulse">
                <div className="text-3xl md:text-5xl font-bold text-primary glow-text">{timeLeft.days}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">дней</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm border-2 border-secondary rounded-lg p-4" style={{boxShadow: '0 0 20px hsla(25, 100%, 60%, 0.6)'}}>
                <div className="text-3xl md:text-5xl font-bold text-secondary" style={{textShadow: '0 0 20px hsla(25, 100%, 60%, 0.8)'}}>{timeLeft.hours}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">часов</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm border-2 border-accent rounded-lg p-4" style={{boxShadow: '0 0 20px hsla(199, 95%, 55%, 0.6)'}}>
                <div className="text-3xl md:text-5xl font-bold text-accent" style={{textShadow: '0 0 20px hsla(199, 95%, 55%, 0.8)'}}>{timeLeft.minutes}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">минут</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm neon-border rounded-lg p-4 animate-pulse">
                <div className="text-3xl md:text-5xl font-bold text-primary glow-text">{timeLeft.seconds}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">секунд</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="game-gradient text-lg px-8 hover-scale hover:brightness-125 transition-all duration-300" onClick={() => window.open('https://t.me/crtournament_rostov', '_blank')}>
              <Icon name="UserPlus" size={20} className="mr-2" />
              Зарегистрироваться
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 hover-scale border-2 border-primary/50 hover:bg-primary/20 hover:border-primary transition-all duration-300" onClick={() => scrollToSection('about')}>
              <Icon name="Info" size={20} className="mr-2" />
              Подробнее
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 section-gradient">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">О турнире</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Самое масштабное соревнование по Clash Royale в Ростове-на-Дону
            </p>
            <div className="mt-8 max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
              <img src="https://cdn.poehali.dev/projects/94cc7da1-e015-4c01-9bcd-c9f0550c3e4a/files/900476e6-8746-4a48-94de-2e4a721129d3.jpg" alt="Clash Royale Characters" className="w-full h-auto" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover-scale animate-fade-in border-2 border-primary/50" style={{boxShadow: '0 0 20px hsla(262, 90%, 65%, 0.4)'}}>
              <CardHeader>
                <div className="w-12 h-12 game-gradient rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Users" size={28} className="text-white" />
                </div>
                <CardTitle>Для всех уровней</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Турнир открыт для игроков любого уровня мастерства. От новичков до профессионалов!
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover-scale animate-fade-in border-2 border-secondary/50" style={{boxShadow: '0 0 20px hsla(25, 100%, 60%, 0.4)'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Gamepad2" size={28} className="text-white" />
                </div>
                <CardTitle>Формат 1 на 1</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Классические дуэли в формате один на один. Покажи своё мастерство в честной борьбе!
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover-scale animate-fade-in border-2 border-accent/50" style={{boxShadow: '0 0 20px hsla(199, 95%, 55%, 0.4)'}}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon name="MapPin" size={28} className="text-white" />
                </div>
                <CardTitle>Офлайн формат</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Играем вместе в одном месте! Почувствуй атмосферу настоящего киберспортивного события.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="mb-8 max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl">
              <img src="https://cdn.poehali.dev/projects/94cc7da1-e015-4c01-9bcd-c9f0550c3e4a/files/7b446dd8-4106-4094-80e7-72c35e0dc0f4.jpg" alt="Tournament Trophy" className="w-full h-auto" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Призы и награды</h2>
            <p className="text-xl text-muted-foreground">
              Ценные призы для победителей и участников
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="relative overflow-hidden hover-scale animate-fade-in border-2 border-secondary">
              <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                2 место
              </div>
              <CardHeader className="text-center pt-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-300 to-slate-500 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Medal" size={40} className="text-white" />
                </div>
                <CardTitle className="text-2xl">Серебро</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-secondary mb-2">Денежный приз</p>
                <p className="text-muted-foreground">+ игровая техника</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden hover-scale animate-fade-in border-2 border-primary scale-105">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                1 место
              </div>
              <CardHeader className="text-center pt-8">
                <div className="w-24 h-24 mx-auto game-gradient rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary/50">
                  <Icon name="Crown" size={48} className="text-white" />
                </div>
                <CardTitle className="text-3xl">Золото</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">Денежный приз</p>
                <p className="text-muted-foreground">+ техника + кубок чемпиона</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden hover-scale animate-fade-in border-2 border-accent">
              <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                3 место
              </div>
              <CardHeader className="text-center pt-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Award" size={40} className="text-white" />
                </div>
                <CardTitle className="text-2xl">Бронза</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-accent mb-2">Денежный приз</p>
                <p className="text-muted-foreground">+ игровая техника</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Card className="inline-block bg-muted/50">
              <CardContent className="py-4 px-6">
                <p className="text-lg">
                  <Icon name="Gift" size={20} className="inline mr-2 text-primary" />
                  Всем участникам — памятные сувениры и мерч!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Расписание турнира</h2>
            <p className="text-xl text-muted-foreground">
              15 декабря 2025 — программа дня
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="hover-scale animate-fade-in border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 game-gradient rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">9:00 - 9:45</h3>
                    <p className="text-muted-foreground">Регистрация участников на месте</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">10:00 - 10:30</h3>
                    <p className="text-muted-foreground">Открытие турнира и жеребьёвка</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <Icon name="Swords" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">10:30 - 14:00</h3>
                    <p className="text-muted-foreground">Групповой этап (1/16, 1/8, 1/4)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 game-gradient rounded-lg flex items-center justify-center">
                    <Icon name="Coffee" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">14:00 - 14:30</h3>
                    <p className="text-muted-foreground">Перерыв на обед</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">14:30 - 16:00</h3>
                    <p className="text-muted-foreground">Полуфиналы (Bo3)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <Icon name="Crown" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">16:00 - 17:30</h3>
                    <p className="text-muted-foreground">Финал и награждение (Bo5)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Правила турнира</h2>
            <p className="text-xl text-muted-foreground">
              Прочти внимательно перед регистрацией
            </p>
          </div>
          <Card className="animate-fade-in">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 game-gradient rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Регистрация участников</h3>
                    <p className="text-muted-foreground">Регистрация открыта до 10 декабря 2025. Максимальное количество участников — 64 игрока. Регистрация осуществляется онлайн через форму на сайте.</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 game-gradient rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Формат соревнования</h3>
                    <p className="text-muted-foreground">Турнир проходит в формате Single Elimination (олимпийская система). Каждый матч — Bo3 (лучший из трёх). Финал — Bo5 (лучший из пяти).</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 game-gradient rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Требования к участникам</h3>
                    <p className="text-muted-foreground">Минимальный уровень короля — 9. Все карты должны соответствовать турнирным стандартам. Запрещено использование читов и модификаций игры.</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 game-gradient rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Время проведения</h3>
                    <p className="text-muted-foreground">Турнир начинается в 10:00. Регистрация на месте — с 9:00 до 9:45. Опоздавшие участники дисквалифицируются.</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 game-gradient rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Правила поведения</h3>
                    <p className="text-muted-foreground">Уважительное отношение к соперникам и организаторам обязательно. За токсичное поведение — предупреждение или дисквалификация. Решения судей окончательны.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 px-4 section-gradient">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты организаторов</h2>
            <p className="text-xl text-muted-foreground">
              Остались вопросы? Свяжитесь с нами!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover-scale animate-fade-in">
              <CardHeader>
                <div className="w-12 h-12 game-gradient rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Mail" size={28} className="text-white" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:tournament@clashroyale-rostov.ru" className="text-primary hover:underline text-lg">
                  tournament@clashroyale-rostov.ru
                </a>
                <p className="text-muted-foreground mt-2">Ответим в течение 24 часов</p>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Phone" size={28} className="text-white" />
                </div>
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+79094211913" className="text-primary hover:underline text-lg">
                  +7 (909) 421-19-13
                </a>
                <p className="text-muted-foreground mt-2">Звоните с 10:00 до 20:00</p>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon name="MessageCircle" size={28} className="text-white" />
                </div>
                <CardTitle>Telegram</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="https://t.me/crtournament_rostov" className="text-primary hover:underline text-lg">
                  @crtournament_rostov
                </a>
                <p className="text-muted-foreground mt-2">Быстрая связь в мессенджере</p>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in">
              <CardHeader>
                <div className="w-12 h-12 game-gradient rounded-lg flex items-center justify-center mb-4">
                  <Icon name="MapPin" size={28} className="text-white" />
                </div>
                <CardTitle>Место проведения</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-1">ТЦ "Горизонт"</p>
                <p className="text-muted-foreground">г. Ростов-на-Дону, пр. Космонавтов, 32</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="game-gradient text-lg px-8 hover-scale hover:brightness-125 transition-all duration-300" onClick={() => window.open('https://t.me/crtournament_rostov', '_blank')}>
              <Icon name="Send" size={20} className="mr-2" />
              Присоединиться к каналу
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 Clash Royale Tournament Ростов-на-Дону. Все права защищены.</p>
          <p className="mt-2 text-sm">Clash Royale является торговой маркой Supercell</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;