import React from "react";

// ===== Apresentação Pro-Pulse (HTML/React estilo slides) =====
// Instruções de uso:
// 1) Copie e cole TODO este código em um projeto React (ou no CodeSandbox/Vite) com Tailwind CSS ativado.
// 2) Cada <section> é um slide. Use as setas do teclado (ou clique) para navegar.
// 3) Para exportar como PDF: use o comando de impressão do navegador (Ctrl/Cmd+P) e escolha "Salvar como PDF".
//    Este arquivo já possui quebras de página via CSS para sair 1 slide por página.
// 4) Você pode editar textos/cores diretamente abaixo. 
// Obs.: Ícones e gráficos são vetoriais (SVG) para manter nitidez ao imprimir.

// ===== Estilos inline essenciais (padrão Tailwind + algumas regras de impressão) =====
const GlobalStyles = () => (
  <style>{`
    @media print {
      @page { size: 1920px 1080px; margin: 0; }
      .slide { page-break-after: always; break-after: page; }
      .no-print { display: none !important; }
    }
    html, body, #root { height: 100%; }
    body { background: #0b1220; }
    .deck { min-height: 100vh; }
    .slide {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem; 
      color: #e6eefc;
    }
    .kicker { letter-spacing: .18em; text-transform: uppercase; font-weight: 700; opacity: .9; }
    .title { font-size: clamp(2rem, 5vw, 5rem); font-weight: 800; line-height: 1.05; }
    .subtitle { font-size: clamp(1rem, 2.5vw, 1.6rem); opacity: .9; }
    .bullet li { margin: .5rem 0; }
    .badge { padding: .35rem .6rem; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12) }
    .grid2 { display: grid; grid-template-columns: 1.4fr 1fr; gap: 2.5rem; align-items: center; }
    .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
    .card { background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03)); border: 1px solid rgba(255,255,255,.12); border-radius: 1.2rem; padding: 1.5rem; }
    .cta { background: linear-gradient(90deg,#ff5b8a,#ff8a5b); color: #0b1220; font-weight: 800; border-radius: 999px; padding: .9rem 1.2rem; display: inline-block; box-shadow: 0 8px 30px rgba(255,99,132,.25); }
    .accent { color: #ff6a88; }
    .accent2 { color: #77e4ff; }
    .muted { color: #a6b1c3; }
    .gearGlow { filter: drop-shadow(0 0 8px rgba(255,106,136,.55)); }
  `}</style>
);

// ====== Helpers visuais (SVGs) ======
const LungsGears = () => (
  <svg className="w-full max-w-[520px] gearGlow" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff6a88"/>
        <stop offset="100%" stopColor="#ff8a5b"/>
      </linearGradient>
    </defs>
    <path d="M256 100c-42 0-80 20-104 52-21 28-32 64-32 100v56c0 33 27 60 60 60h40V180h32v188h40c33 0 60-27 60-60v-56c0-36-11-72-32-100-24-32-62-52-104-52Z" fill="url(#g1)" opacity="0.2"/>
    {/* Bronquios estilizados */}
    <g stroke="#ff6a88" strokeWidth="6" strokeLinecap="round" opacity="0.9">
      <path d="M256 160v80"/>
      <path d="M256 200c-40 0-72 32-72 72" opacity=".7"/>
      <path d="M256 200c40 0 72 32 72 72" opacity=".7"/>
    </g>
    {/* Engrenagens */}
    <g fill="#ff6a88" opacity="0.9">
      <Gear cx={176} cy={248} r={38} />
      <Gear cx={336} cy={248} r={46} />
      <Gear cx={256} cy={308} r={24} />
    </g>
  </svg>
);

const Gear = ({cx, cy, r}: {cx:number, cy:number, r:number}) => (
  <g transform={`translate(${cx} ${cy})`}>
    <circle r={r} fill="rgba(255,255,255,.06)" stroke="#ff6a88"/>
    {[...Array(12)].map((_,i)=>{
      const a = (i/12)*Math.PI*2; const R=r+8; const x=Math.cos(a)*R; const y=Math.sin(a)*R;
      return <rect key={i} x={x-3} y={y-8} width={6} height={16} fill="#ff6a88" transform={`rotate(${(a*180/Math.PI)} ${x} ${y})`} rx={1}/>;
    })}
    <circle r={r*0.55} stroke="#ff6a88" fill="none"/>
    <circle r={r*0.1} fill="#ff6a88"/>
  </g>
);

const Check = (props:any) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" {...props}><path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const Bolt = (props:any) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" {...props}><path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const Heart = (props:any) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" {...props}><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 000-7.8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const Lungs = (props:any) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" {...props}><path d="M12 4v8M12 12c-3 0-5 2-5 5v3M12 12c3 0 5 2 5 5v3M7 20s-3-1-3-5 2-7 8-7M17 20s3-1 3-5-2-7-8-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

// ====== Slide Wrapper & Controls ======
const Slide = ({children, bg = "radial-gradient(1200px 700px at 20% 10%, rgba(255,106,136,.15), transparent), radial-gradient(900px 600px at 90% 80%, rgba(119,228,255,.12), transparent)", overlay=true}: any) => (
  <section className="slide" style={{background: `#0b1220, ${bg}`}}>
    <div className="w-[min(1200px,92vw)] mx-auto">
      {overlay && <div className="absolute inset-0 pointer-events-none"/>}
      {children}
    </div>
  </section>
);

const Dot = ({active}:{active?:boolean}) => (
  <span className={`inline-block w-2 h-2 rounded-full ${active?"bg-white":"bg-white/40"}`}/>
);

// ====== Deck principal ======
export default function DeckProPulse(){
  return (
    <div className="deck relative">
      <GlobalStyles/>

      {/* Barra superior (navegação rápida) */}
      <div className="no-print fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10">
        <span className="badge">Pro‑Pulse</span>
        <span className="hidden md:flex items-center gap-1 text-xs text-slate-300">
          <Dot active/><Dot/><Dot/><Dot/><Dot/><Dot/><Dot/><Dot/><Dot/><Dot/><Dot/><Dot/>
        </span>
        <a href="#fechamento" className="cta text-xs">Ir ao fechamento</a>
      </div>

      {/* Slide 1 — Abertura */}
      <Slide>
        <div className="grid2">
          <div>
            <div className="kicker accent">Programa de Treinamento Respiratório</div>
            <h1 className="title mt-3">Pro‑Pulse: <span className="accent">Respiração</span> que impulsiona sua performance</h1>
            <p className="subtitle mt-4 max-w-xl">Você treina pernas, braços e core… mas esquece do seu motor principal: <b>os músculos respiratórios</b>.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="badge">TRC • TMR</span>
              <span className="badge">Base científica</span>
              <span className="badge">Plano individualizado</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <LungsGears/>
          </div>
        </div>
      </Slide>

      {/* Slide 2 — Problema */}
      <Slide>
        <div className="grid2">
          <div>
            <h2 className="title">O que <span className="accent">ninguém te conta</span> sobre a fadiga</h2>
            <ul className="bullet mt-6 text-lg">
              <li className="flex items-start gap-3"><Bolt className="accent"/> <span><b>Fadiga precoce</b> e queimação muscular</span></li>
              <li className="flex items-start gap-3"><Bolt className="accent"/> <span><b>Recuperação lenta</b> entre treinos</span></li>
              <li className="flex items-start gap-3"><Bolt className="accent"/> <span><b>Falta de ar</b> até em cargas leves</span></li>
            </ul>
            <p className="muted mt-6">Muitas vezes o limitador não está nas pernas ou no coração, e sim na <b>respiração que não acompanha</b> o esforço.</p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-3">As três engrenagens</h3>
            <div className="grid3">
              <div className="card"><Heart className="accent2"/> <p className="mt-2">Coração</p></div>
              <div className="card"><Lungs className="accent"/> <p className="mt-2">Pulmão</p></div>
              <div className="card"><Bolt className="accent2"/> <p className="mt-2">Músculos</p></div>
            </div>
            <p className="muted mt-4">Quanto melhor cada engrenagem, melhor o desempenho global.</p>
          </div>
        </div>
      </Slide>

      {/* Slide 3 — Ciência por trás */}
      <Slide>
        <div className="grid2">
          <div>
            <h2 className="title">Por que treinar <span className="accent">músculos respiratórios</span>?</h2>
            <ul className="bullet mt-6 text-lg">
              <li className="flex items-start gap-3"><Check className="accent"/> <span>Melhora a <b>captação e entrega</b> de O₂</span></li>
              <li className="flex items-start gap-3"><Check className="accent"/> <span><b>Retarda</b> o metaborreflexo respiratório</span></li>
              <li className="flex items-start gap-3"><Check className="accent"/> <span>Reduz o <b>custo energético</b> da ventilação → mais energia para os locomotores</span></li>
            </ul>
            <p className="muted mt-6">O diafragma é treinável como qualquer músculo. Sem treino, ele limita sua performance.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold">Base fisiológica</h3>
            <p className="mt-2">Aplicamos princípios de <b>sobrecarga progressiva</b>, <b>especificidade</b>, <b>reversibilidade</b> e <b>individualidade</b> dentro do método TRC.</p>
            <div className="mt-6 grid3">
              {['Sobrecarga','Especificidade','Reversibilidade'].map((t,i)=> (
                <div key={i} className="card text-center"><span className="text-4xl">{i===0?'📈':i===1?'🎯':'🔄'}</span><p className="mt-2 font-semibold">{t}</p></div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 4 — Princípios (enxuto) */}
      <Slide>
        <div>
          <h2 className="title">Princípios do treinamento <span className="accent">aplicados</span> ao Pro‑Pulse</h2>
          <div className="grid3 mt-8">
            <div className="card"><h4 className="font-bold">Sobrecarga</h4><p className="muted mt-2">Progressão controlada de carga (% da PImáx) e/ou tempo/volume.</p></div>
            <div className="card"><h4 className="font-bold">Especificidade</h4><p className="muted mt-2">Protocolos alinhados ao seu esporte e demanda ventilatória.</p></div>
            <div className="card"><h4 className="font-bold">Reversibilidade</h4><p className="muted mt-2">Sem continuidade, perde-se ganho. Plano prevê manutenção.</p></div>
          </div>
          <div className="grid3 mt-6">
            <div className="card"><h4 className="font-bold">Individualidade</h4><p className="muted mt-2">Ajuste por avaliação objetiva e resposta clínica.</p></div>
            <div className="card"><h4 className="font-bold">Segurança</h4><p className="muted mt-2">Contraindicações checadas e biossegurança de materiais.</p></div>
            <div className="card"><h4 className="font-bold">Mensuração</h4><p className="muted mt-2">Testes funcionais e PImáx/PEmáx para guiar a carga.</p></div>
          </div>
        </div>
      </Slide>

      {/* Slide 5 — A solução */}
      <Slide>
        <div className="grid2">
          <div>
            <h2 className="title">A solução: <span className="accent">Programa Pro‑Pulse</span></h2>
            <p className="subtitle mt-4 max-w-2xl">Programa individualizado de <b>treinamento respiratório</b> integrado ao exercício físico, com progressão estruturada e reavaliações periódicas.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="badge">Avaliação</span>
              <span className="badge">Plano</span>
              <span className="badge">Progressão</span>
              <span className="badge">Resultados</span>
            </div>
          </div>
          <div className="card">
            <LungsGears/>
          </div>
        </div>
      </Slide>

      {/* Slide 6 — Como funciona (3 pilares) */}
      <Slide>
        <div>
          <h2 className="title">Como funciona (3 pilares)</h2>
          <div className="grid3 mt-8">
            <div className="card">
              <h4 className="font-bold text-xl">1) Avaliação Objetiva</h4>
              <ul className="bullet mt-3">
                <li>Manovacuometria: <b>PImáx/PEmáx</b></li>
                <li>Testes funcionais (6MWT, degrau, sentar-levantar)</li>
                <li>Sinais vitais e percepção de esforço</li>
              </ul>
            </div>
            <div className="card">
              <h4 className="font-bold text-xl">2) Treino Combinado (TRC)</h4>
              <ul className="bullet mt-3">
                <li>Respiratório (força/endurance) + físico (força/aeróbio)</li>
                <li>Específico para a modalidade</li>
                <li>Orientação técnica e supervisão</li>
              </ul>
            </div>
            <div className="card">
              <h4 className="font-bold text-xl">3) Reavaliação & Ajustes</h4>
              <ul className="bullet mt-3">
                <li>Progressão semanal planejada</li>
                <li>Relatórios simples e comparativos</li>
                <li>Plano de manutenção</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 7 — Benefícios */}
      <Slide>
        <div>
          <h2 className="title">Benefícios do Pro‑Pulse</h2>
          <div className="grid3 mt-8">
            <div className="card flex items-start gap-3"><Check className="accent"/> <div><b>Mais O₂ útil</b><p className="muted">Captação e entrega otimizadas.</p></div></div>
            <div className="card flex items-start gap-3"><Check className="accent"/> <div><b>Menos fadiga</b><p className="muted">Retarda metaborreflexo, preserva locomotores.</p></div></div>
            <div className="card flex items-start gap-3"><Check className="accent"/> <div><b>Economia energética</b><p className="muted">Ventilação mais eficiente.</p></div></div>
          </div>
          <div className="grid3 mt-6">
            <div className="card flex items-start gap-3"><Check className="accent"/> <div><b>Performance sustentada</b><p className="muted">Mantém intensidade por mais tempo.</p></div></div>
            <div className="card flex items-start gap-3"><Check className="accent"/> <div><b>Planos seguros</b><p className="muted">Checagem de contraindicações e biossegurança.</p></div></div>
            <div className="card flex items-start gap-3"><Check className="accent"/> <div><b>Mensuração de resultados</b><p className="muted">Indicadores objetivos a cada fase.</p></div></div>
          </div>
        </div>
      </Slide>

      {/* Slide 8 — Para quem */}
      <Slide>
        <div>
          <h2 className="title">Para quem é o Pro‑Pulse?</h2>
          <div className="grid3 mt-8">
            <div className="card text-center">
              <div className="text-5xl">🏃‍♂️🚴‍♀️🏊‍♂️</div>
              <h4 className="font-bold mt-3">Endurance</h4>
              <p className="muted">Corrida, ciclismo, triathlon.</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl">🥊🏋️‍♀️⚽</div>
              <h4 className="font-bold mt-3">Força/Potência</h4>
              <p className="muted">Crossfit, lutas, futebol, vôlei.</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl">😮‍💨</div>
              <h4 className="font-bold mt-3">Respirar melhor</h4>
              <p className="muted">Asma leve, controle de dispneia, condicionamento.</p>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 9 — Estrutura do programa (linha do tempo) */}
      <Slide>
        <div>
          <h2 className="title">Estrutura do programa (8 semanas)</h2>
          <div className="mt-8 grid grid-cols-4 gap-4">
            {[
              {w:"Semanas 1–2", t:"Adaptação", d:"30–40% da PImáx, técnica e aprendizado"},
              {w:"Semanas 3–4", t:"Treino combinado", d:"Respiratório + físico, especificidade esportiva"},
              {w:"Semanas 5–6", t:"Progressão", d:"Ajuste de carga, séries e volume"},
              {w:"Semanas 7–8", t:"Reavaliação", d:"Comparativos e plano de manutenção"},
            ].map((s,i)=> (
              <div key={i} className="card">
                <div className="text-sm kicker">{s.w}</div>
                <h4 className="font-bold text-xl mt-1">{s.t}</h4>
                <p className="muted mt-2">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="muted mt-6">Testes funcionais e manovacuometria orientam a progressão semanal.</p>
        </div>
      </Slide>

      {/* Slide 10 — Investimento (ancoragem) */}
      <Slide>
        <div className="grid2">
          <div>
            <h2 className="title">Investimento com <span className="accent">valor progressivo</span></h2>
            <p className="subtitle mt-3">Quanto maior o plano, <b>menor o valor por sessão</b> e maior a segurança de resultados.</p>
            <div className="mt-8 grid3">
              {[{n:"Avulso", v:"R$ X/sessão", d:"Para experimentar"}, {n:"8 semanas", v:"R$ XXX", d:"Sessão sai por R$ ↓"}, {n:"16 semanas", v:"R$ XXXX", d:"Melhor custo-benefício"}].map((p,i)=> (
                <div key={i} className="card text-center">
                  <div className="kicker">{p.n}</div>
                  <div className="text-3xl font-extrabold mt-2 accent">{p.v}</div>
                  <p className="muted mt-2">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h4 className="font-bold text-xl">Como decidir?</h4>
            <ul className="bullet mt-3">
              <li>Objetivo (performance, saúde, manutenção)</li>
              <li>Agenda e disponibilidade</li>
              <li>Necessidade de supervisão</li>
            </ul>
            <p className="muted mt-4">Transparência total: metas, prazos e entregas claras.</p>
          </div>
        </div>
      </Slide>

      {/* Slide 11 — Storytelling / Caso real */}
      <Slide>
        <div>
          <h2 className="title">Caso real (storytelling)</h2>
          <div className="grid2 mt-6">
            <div className="card">
              <div className="kicker">1) Contexto</div>
              <p className="mt-2">Atleta amador de corrida, 10K, queixa de fadiga precoce aos 6–7 km.</p>
              <div className="kicker mt-4">2) Desafio</div>
              <p className="mt-2">Recuperação lenta, ofego em ritmos moderados.</p>
            </div>
            <div className="card">
              <div className="kicker">3) Intervenção</div>
              <p className="mt-2">Pro‑Pulse 8 semanas: TMR 40→60% PImáx + intervalado aeróbio.</p>
              <div className="kicker mt-4">4) Resultado</div>
              <p className="mt-2">Tempo melhorado em 10%, percepção de esforço menor e recuperação mais rápida.</p>
            </div>
          </div>
          <p className="muted mt-6">Exemplos ilustrativos. Resultados variam conforme avaliação e adesão.</p>
        </div>
      </Slide>

      {/* Slide 12 — Fechamento */}
      <Slide>
        <div id="fechamento" className="text-center">
          <div className="kicker accent">Fechamento</div>
          <h2 className="title mt-3">Respire melhor. Renda mais. <span className="accent">Viva mais.</span></h2>
          <p className="subtitle mt-4">Você não compra sessões — você compra <b>autonomia, fôlego e desempenho duradouro</b>.</p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a href="#" className="cta">Quero começar</a>
            <span className="badge">@seuinsta</span>
            <span className="badge">seuemail@email.com</span>
          </div>
        </div>
      </Slide>

      {/* Rodapé (instruções rápidas) */}
      <div className="no-print fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-300/80 bg-white/5 backdrop-blur px-3 py-2 rounded-full border border-white/10">
        Dica: use Ctrl/Cmd+P para salvar como PDF (1 slide por página). Personalize os valores no Slide 10.
      </div>
    </div>
  );
}
