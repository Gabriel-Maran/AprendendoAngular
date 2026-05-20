import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorias } from '../../models/enums/Categorias';
import { Validacoes } from '../../utils/Validacoes';
import { Toggle } from '../../components/toggle/toggle';
import { Evento } from '../../models/Evento';
import { EventService } from '../../services/event/event-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-event',
  imports: [ReactiveFormsModule, CommonModule, Toggle, RouterLink],
  templateUrl: './new-event.html',
  styleUrl: './new-event.css',
})
export class NewEvent {
  id = input<string>();
  eventos: Evento[] = [];
  private router = inject(Router);
  Categorias = Categorias;
  private eventService = inject(EventService);
  isEdit = computed(() => !!this.id());

  constructor() {
    // O effect reage automaticamente sempre que o "id" mudar
    effect(() => {
      const currentId = this.id();

      if (currentId) {
        const eventoSearch = this.eventService.getEvent(currentId);

        if (eventoSearch) {
          this.forms.patchValue({
            titulo: eventoSearch.titulo ?? '',
            descricao: eventoSearch.descricao ?? '',
            local: eventoSearch.local ?? '',
            preco: eventoSearch.preco ?? 0,
            categoria: eventoSearch.categoria as Categorias,
            imagemUrl: eventoSearch.imagemUrl ?? '',
            inscritos: eventoSearch.inscritos ?? 0,
            destaque: eventoSearch.destaque ?? false,
            date: eventoSearch.data,
            capacidadeMaxima: eventoSearch.capacidadeMaxima,
          });
        }
      }
    });
  }

  forms = new FormGroup(
    {
      id: new FormControl(0),
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      descricao: new FormControl(''),
      date: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      preco: new FormControl(0, [Validators.required, Validators.min(1)]),
      categoria: new FormControl(Categorias.VAZIO, [
        Validators.required,
        Validacoes.naoPodeSer(Categorias.VAZIO), // O validador agora vai rodar com o tipo correto
      ]),
      imagemUrl: new FormControl('', [Validators.required]),
      inscritos: new FormControl(0, [Validators.required, Validators.min(0)]),
      destaque: new FormControl(false, [Validators.required]),
      capacidadeMaxima: new FormControl(0, [Validators.required]),
    },
    { validators: Validacoes.capacidadeLimite },
  );

  // CORREÇÃO 2: Garante que apenas os valores de texto sejam listados, sem quebrar o índice numérico se houver
  listaCategorias = Object.values(Categorias).filter(
    (value) => typeof value === 'string' && value !== Categorias.VAZIO,
  );

  campos = [
    { id: 'titulo', label: 'Título', type: 'text' },
    { id: 'descricao', label: 'Descrição', type: 'text' },
    { id: 'date', label: 'Data', type: 'date' },
    { id: 'local', label: 'Local', type: 'text' },
    { id: 'preco', label: 'Preço', type: 'number' },
    { id: 'imagemUrl', label: 'Imagem Url', type: 'text' },
    { id: 'inscritos', label: 'Inscritos', type: 'number' },
    { id: 'capacidadeMaxima', label: 'Capacidade Máxima', type: 'number' },
  ];

  mudaDestaque() {
    const valorAtual = this.forms.get('destaque')?.value;
    this.forms.patchValue({ destaque: !valorAtual });
  }

  salvarForms() {
    this.forms.markAllAsTouched();
    if (this.forms.invalid) {
      console.log('Formulário inválido!', this.forms.errors, this.forms.get('categoria')?.errors);
      return;
    }

    const formValues = this.forms.getRawValue();
    const idEvento = this.id() ?? crypto.randomUUID();
    const eventoToSave: Evento = {
      id: idEvento!,
      titulo: formValues.titulo ?? '',
      descricao: formValues.descricao ?? '',
      local: formValues.local ?? '',
      preco: formValues.preco ?? 0,
      categoria: formValues.categoria as any,
      imagemUrl: formValues.imagemUrl ?? '',
      inscritos: formValues.inscritos ?? 0,
      destaque: formValues.destaque ?? false,
      data: formValues.date!.toString(),
      capacidadeMaxima: formValues.capacidadeMaxima!,
    };
    if (this.isEdit()) {
      this.eventService.updateEvent(this.id()!, eventoToSave);
    } else {
      this.eventService.addEvent(eventoToSave);
    }
    this.forms.reset({});
  }

  excluirEvento() {
    this.eventService.deleteEvent(this.id() ?? '0');
    this.router.navigate(['/home']);
  }
}
